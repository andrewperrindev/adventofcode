# ADVENT OF CODE: Day 23, Part 2
# See README for context.
#
map = File.readlines('walk.example.txt')
map = map.map { |line|
  line.strip.split('')
}

# Return the coordinates of the '.' space on the first line
def find_start(maze)
  return maze[0].each_with_index.reduce(-1) do |start, (space, space_idx)|
      space === '.' ? space_idx : start
  end
end

# Return the coordinates of the '.' space on the last line
def find_end(maze)
  return maze[-1].each_with_index.reduce(-1) do |start, (space, space_idx)|
      space === '.' ? space_idx : start
  end
end

# Return true if the coordinates match the end coordinates
def is_end(space, end_coords)
  return coord_to_key(space) == coord_to_key(end_coords)
end

# Return true if the two coordinates are equal
def coords_equal?(coord1, coord2)
  return (coord1[0] == coord2[0] && coord1[1] == coord2[1])
end

# Convenience function to get the character in a certain space in the grid.
def get_space(grid, x, y)
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length)
    return '?'
  end

  return grid[y][x]
end

# Returns true if the array of intersection coordinates contains the given coordinates
def has_intersection?(intersections, coords)
  !intersections.index do |intersection|
    coords_equal?(intersection[:coords], coords)
  end.nil?
end

# Convenience function to convert a coordinate array pair to a string
def coord_to_key(coord)
  return "#{coord[0]},#{coord[1]}"
end

# If the coord doesn't already exist in our list of connections, add it.
def add_if_not_exist(connection_list, item)
  found = nil
  connection_list.each do |entry|
    if (coords_equal?(entry[:next_coord], item[:next_coord]))
      found = entry
    end
  end
  if (found.nil?)
    connection_list.push(item)
  end
end

# Walk the given maze to find all intersections and the connections between them.
# Record the number of steps between them (length) for later calculations.
def find_connections(maze, start, finish)
  # Find the first intersection and use it to init the variables we'll use to track our progress.
  info = find_next_intersection(maze, start, finish)
  intersections = [{coords: info[:coords], paths: info[:paths]}]
  connections = {}
  back_refs = {}
  connections[coord_to_key(start)] = [{next_coord: info[:coords], length: info[:length]}]

  while (!intersections.empty?)
    intersection = intersections.shift
    intersection_key = coord_to_key(intersection[:coords])

    # Only proceed if we haven't already investigated this intersection's connections,
    # or it isn't already queued for later investigation.
    if (!connections.has_key?(intersection_key) && !has_intersection?(intersections, intersection[:coords]))
      intersection[:paths].each do |coords|
        # For each path branching off this intersection, find the next intersection it leads to.
        # Add it to our list of intersections to investigate, as well as the list of connections
        # to the current intersection.
        info = find_next_intersection(maze, coords, finish, [intersection_key], 1)
        intersections.push({coords: info[:coords], paths: info[:paths]})
        inter_connections = connections[intersection_key] || []
        add_if_not_exist(inter_connections, {next_coord: info[:coords], length: info[:length]})
        connections[intersection_key] = inter_connections

        # Also add to a list of back references. We keep this until later...
        back_ref = back_refs[coord_to_key(info[:coords])] || []
        back_ref.push({next_coord: intersection[:coords], length: info[:length]})
        back_refs[coord_to_key(info[:coords])] = back_ref

        # ... when we actually arrive at the intersection. Then we add the back refs to the list
        # of connections. We do this so we can keep track of intersections we have and haven't visited.
        back_ref = back_refs[intersection_key] || []
        back_ref.each do |ref|
          add_if_not_exist(connections[intersection_key], ref)
        end
        back_refs.delete(intersection_key)
      end
    end
  end

  return connections
end

# Walk the maze until we find either the next intersection or the end of the maze.
# Previous spaces list ensures we don't backtrack.
# Count is recorded for length of path between intersections.
def find_next_intersection(maze, start, finish, prev_spaces = [], count = 0)
  prev_spaces.push(coord_to_key(start))
  moves = find_next_spaces(maze, prev_spaces, start)
  # Keep moving until we find an intersection (defined as more than one possible move)
  # or the end of the maze.
  while (moves.length == 1 && !is_end(start, finish))
    count += 1
    start = moves.shift
    prev_spaces.push(coord_to_key(start))
    moves = find_next_spaces(maze, prev_spaces, start)
  end
  return {coords: start, length: count, paths: moves}
end

# Look up, down, left and right to see what valid moves are available.
def find_next_spaces(maze, prev_spaces, curr_space)
  space_types = ['.','v','>']
  x, y = curr_space
  curr_space_type = get_space(maze, x, y)

  candidates = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]

  return candidates.reduce([]) do |open_spaces, coords|
    space_x, space_y = coords
    next_space_type = get_space(maze, space_x, space_y)

    # Only consider spaces of a certain type AND we haven't visited previously.
    if (space_types.include?(next_space_type) && !prev_spaces.include?("#{space_x},#{space_y}"))
      open_spaces.push(coords)
    end
    open_spaces
  end
end

# Using a list of intersections and their connections, find all possible paths from the
# start to the finish.
def find_path(connections, path, finish, full_paths)
  # Starting point is the most recent coord in the path so far.
  loc = path[-1]
  loc_coords = loc[:coords]

  # If we're at the finish, we've found a complete path.
  # Add its length to a list and bail.
  if (coords_equal?(loc_coords, finish))
    path_length = path.map { |step| step[:length] }.sum
    if (full_paths.add?(path_length))
      puts "Added new path length: #{path_length}"
    end
    return
  end

  # For each connection to this intersection, if we haven't already visited it, then
  # add it to our path so far and continue with the path search.
  connections[coord_to_key(loc_coords)].each do | next_loc |
    if (!has_intersection?(path, next_loc[:next_coord]))
      next_path = path.clone.push({coords: next_loc[:next_coord], length: next_loc[:length]})
      find_path(connections, next_path, finish, full_paths)
    end
  end
end

# Locate our start & end locations.
start = [find_start(map), 0]
finish = [find_end(map), map.length - 1]

connections = find_connections(map, start, finish)
# Use a Set to ensure we only track unique path lengths.
full_paths = Set.new
path = find_path(connections, [{coords: start, length: 0}], finish, full_paths)
# Result is the longest path.
puts full_paths.max
