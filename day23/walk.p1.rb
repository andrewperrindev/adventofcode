# ADVENT OF CODE: Day 23, Part 1
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
  return "#{space[0]},#{space[1]}" == "#{end_coords[0]},#{end_coords[1]}"
end

# Convenience function to get the character in a certain space in the grid.
def get_space(grid, x, y)
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length)
    return '?'
  end

  return grid[y][x]
end

# Look up, down, left and right to see what valid moves are available.
def find_next_spaces(maze, prev_spaces, curr_space)
  space_types = ['.','v','>']
  x, y = curr_space
  curr_space_type = get_space(maze, x, y)

  # Directional spaces force movement in only one direction.
  if (curr_space_type == 'v')
    return [[x, y + 1]]
  elsif (curr_space_type == '>')
    return [[x + 1, y]]
  else
    candidates = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]

    return candidates.reduce([]) do |open_spaces, coords|
      space_x, space_y = coords
      next_space_type = get_space(maze, space_x, space_y)

      # If this direction takes us the wrong way through a one-way space,
      # mark it as blocked.
      if (next_space_type == 'v' && space_y < y)
        next_space_type = '#'
      elsif (next_space_type == '>' && space_x < x)
        next_space_type = '#'
      end

    # Only consider spaces of a certain type AND we haven't visited previously.
    if (space_types.include?(next_space_type) && !prev_spaces.include?("#{space_x},#{space_y}"))
        open_spaces.push(coords)
      end
      open_spaces
    end
  end
end

# Locate our start & end locations.
start = [find_start(map), 0]
finish = [find_end(map), map.length - 1]

# Start our first path at the start
candidate_paths = [[start]]
finished_paths = []

# While we have paths to explore
while candidate_paths.length > 0
  # Get the first path in our list of possibilities, and fill a set
  # of previous spaces so we can easily lookup if we've been to a space already.
  candidate_path = candidate_paths[0]
  prev_spaces = Set.new
  candidate_path.each { | c | prev_spaces.add "#{c[0]},#{c[1]}"}

  # Find the next spaces we can move to given our current path location.
  loc = candidate_path[-1]
  next_spaces = find_next_spaces(map, prev_spaces, loc)
  # Take the first move to explore first
  next_space = next_spaces.shift

  # If any other moves exist, create new paths that follow these moves
  # and add to our candidate list to explore later.
  next_spaces.each do |other_space|
    branch_path = candidate_path.clone
    branch_path.push(other_space)
    candidate_paths.push(branch_path)
    puts "ADD: #{candidate_paths.length}"
  end

  candidate_path.push(next_space)
  # If this space is the end of the maze, add to our list of finished paths
  # and remove it from the list of candidates.
  if is_end(next_space, finish)
    finished_paths.push(candidate_paths.shift)
    puts "REMOVE: #{candidate_paths.length}"
  end
end

# Final result is the longest path we found.
puts finished_paths.map { |p| p.length - 1 }.max
