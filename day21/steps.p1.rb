# ADVENT OF CODE: Day 21, Part 1
# See README for context.
#
map = File.readlines('steps.example.txt')
map = map.map { |line|
  line.strip.split('')
}

# Return the coordinates of the space marked 'S'
def find_start(maze)
  return maze.each_with_index.reduce([-1, -1]) do |coords, (row, row_idx)|
    if (coords[0] < 0)
      x = row.each_with_index.reduce(-1) do |start, (space, space_idx)|
        space === 'S' ? space_idx : start
      end
      if (x >= 0)
        coords = [x, row_idx]
      end
    end
    coords
  end
end

# Convenience function to get the character in a certain space in the grid.
def get_space(grid, x, y)
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length)
    return '?'
  end

  return grid[y][x]
end

# Convenience function to add a space to a set if it's open.
def add_if_open(set, space, x, y)
  if !(space == '#')
    set.add("#{x},#{y}")
  end
end

start = find_start(map)
step_coords = ["#{start[0]},#{start[1]}"]
# Use a set to keep track of spaces we move to. Since spaces
# could overlap, a set allows us to keep a distinct list.
next_step_coords = Set.new

# For each step, iterate over our current locations and see
# if we can move up, down, left or right. Add each valid location
# to a move set to analyze on our next step.
for count in 1..64 do
  puts "Step #{count} => #{step_coords.length} spots"

  step_coords.each do |coords|
    x, y = coords.split(',').map { |c| Integer(c) }

    # right
    space = get_space(map, x + 1, y)
    add_if_open(next_step_coords, space, x + 1, y)

    # left
    space = get_space(map, x - 1, y)
    add_if_open(next_step_coords, space, x - 1, y)

    # up
    space = get_space(map, x, y - 1)
    add_if_open(next_step_coords, space, x, y - 1)

    # down
    space = get_space(map, x, y + 1)
    add_if_open(next_step_coords, space, x, y + 1)
  end

  step_coords = next_step_coords
  next_step_coords = Set.new
end

# Result is final number of locations
puts step_coords.length
