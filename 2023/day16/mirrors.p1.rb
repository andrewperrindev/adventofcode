# ADVENT OF CODE: Day 16, Part 1
# See README for context.
#
module Direction
  UP = 'UP'
  DOWN = 'DOWN'
  LEFT = 'LEFT'
  RIGHT = 'RIGHT'
end

# Mark a space as having been seen so we can avoid going in circles.
# We need to not only remember the coordinates, but also what direction
# we were going, as moving a different direction could have different results
# and won't necesarily take us on the same path.
def add_seen(energized, x, y, direction)
  space = get_space(energized, x, y)
  if space == '.'
    space = Set.new
    set_space(energized, x, y, space)
  end
  space.add(direction)
end

# Returns true if we've been to these coordinates before
# while ALSO heading in the same direction.
def seen?(energized, x, y, direction)
  space = get_space(energized, x, y)
  return space != '.' && space.include?(direction)
end

# Traverse a path through the grid of mirrors starting from the
# coordinates given and moving in the direction given.
def traverse_mirrors(mirrors, x, y, direction, energized)
  # Traverse the path until we move off the grid or encounter a space
  # we've seen before.
  if (y < 0 || y >= mirrors.length || x < 0 || x >= mirrors[0].length || seen?(energized, x, y, direction))
    return
  end

  # Grab the current space value.
  space = get_space(mirrors, x, y)

  # Mark as seen, which includes the direction we are moving.
  add_seen(energized, x, y, direction)

  # Figure out what direction we need to move next, based on the mirror
  # (or lack thereof) in this space. Could be multiple directions.
  get_next_direction(space, direction).each do |next_direction|
    # Locate the space we need to move to next.
    next_x, next_y = get_next_coords(next_direction, x, y)
    traverse_mirrors(mirrors, next_x, next_y, next_direction, energized)
  end
end

# Given a direction and coordinates, figure out what the new
# coordinates should be.
def get_next_coords(direction, x, y)
  case direction
  when Direction::UP
    return [x, y - 1]
  when Direction::DOWN
    return [x, y + 1]
  when Direction::LEFT
    return [x - 1, y]
  when Direction::RIGHT
    return [x + 1, y]
  end
end

# Given a space and the direction we entered, return where we need to move
# to leave the space. Some spaces require us to move multiple directions.
def get_next_direction(space, entry_direction)
  case space
  when '|'
    case entry_direction
    when Direction::UP, Direction::DOWN
      return [entry_direction]
    else
      return [Direction::UP, Direction::DOWN]
    end
  when '-'
    case entry_direction
    when Direction::LEFT, Direction::RIGHT
      return [entry_direction]
    else
      return [Direction::LEFT, Direction::RIGHT]
    end
  when '/'
    case entry_direction
    when Direction::RIGHT
      return [Direction::UP]
    when Direction::LEFT
      return [Direction::DOWN]
    when Direction::UP
      return [Direction::RIGHT]
    when Direction::DOWN
      return [Direction::LEFT]
    end
  when '\\'
    case entry_direction
    when Direction::RIGHT
      return [Direction::DOWN]
    when Direction::LEFT
      return [Direction::UP]
    when Direction::UP
      return [Direction::LEFT]
    when Direction::DOWN
      return [Direction::RIGHT]
    end
  end

  return [entry_direction];
end

# Convenience function to get the character in a certain space in the grid.
def get_space(grid, x, y)
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length)
    return '?'
  end

  return grid[y][x]
end

# Convenience function to set a value in a certain space in the grid.
def set_space(grid, x, y, value)
  if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length)
    grid[y][x] = value
  end
end

lines = File.readlines('mirrors.example.txt')
mirrors = lines.map { |line|
  line.strip.split('')
}

# Create a grid to mark where we've visited.
# (AKA which spaces we've "energized")
# This could be done without creating a literal grid, but it's
# how I did it in another AoC so I'm keeping this for now.
energized = mirrors.map do |line|
  Array.new(line.length, '.')
end

# As described in the challenge description, begin in the upper
# left and move right.
traverse_mirrors(mirrors, 0, 0, Direction::RIGHT, energized)

# We took the time to create a grid, might as well print it out
# to visualize the paths we took.
energized.map { |line|
  puts line.map { |space|
    space == '.' ? '.' : '#'
  }.join
}

# Result is the number of spaces we visited.
puts energized.reduce(0) { |total, line|
  total + line.reduce(0) { |count, space| count + (space == '.' ? 0 : 1) }
}
