# ADVENT OF CODE: Day 18, Part 1
# See README for context.
#
plans = File.readlines('trench.input.txt')
plans = plans.map { |line|
  line.strip.split
}

trench = []
x = 0
y = -1

# Read in the plans, drawing out the trench border as we go.
# This is brute force, but helps visualize what is being done.
plans.each do |plan|
  direction, length, color = plan
  if y < 0
    trench.push([])
    y = 0
  end
  case direction
  when 'R'
    Array.new(Integer(length), '#').each do |border|
      if (x < trench[y].length - 1)
        x += 1
        trench[y][x] = border
      else
        trench[y].push(border)
        x = trench[y].length - 1
      end
    end
  when 'L'
    Array.new(Integer(length), '#').each do |border|
      if x > 0
        x -= 1
        trench[y][x] = border
      else
        trench = trench.each_with_index.map do |row, index|
          row.unshift((index == y) ? border : nil)
        end
      end
    end
  when 'D'
    Array.new(Integer(length), '#').each do |border|
      if (y == trench.length - 1)
        trench.push([])
      end
      y += 1
      trench[y][x] = border
    end
  when 'U'
    Array.new(Integer(length), '#').each do |border|
      if (y == 0)
        trench.unshift([])
      else
        y -= 1
      end
      trench[y][x] = border
    end
  end
end

# Use recursion to fill in the open area.
def fill(grid, x, y)
  if (x < 0 || y < 0 || x >= grid[y].length || y >= grid.length)
    return
  end
  if (grid[y][x] == '#')
    return
  end
  grid[y][x] = '#'
  fill(grid, x + 1, y)
  fill(grid, x - 1, y)
  fill(grid, x, y + 1)
  fill(grid, x, y - 1)
end

# Find a closed spot to start the fill
regexp = /^[^#]+#[^#]+#[^#]*$/

startRow = trench.index do |row|
  row_string = row.map { |space| space.nil? ? '.' : space }.join
  regexp.match?(row_string)
end

if (startRow >= 0)
  start_index = trench[startRow].index('#') + 1
  fill(trench, start_index, startRow)
end

trench.map { |line|
  puts line.map { |space|
    space.nil? ? '.' : '#'
  }.join
}

# Calculate total area
puts trench.reduce(0) { |total, row|
  total + row.reduce(0) { |tally, space| tally + (space == '#' ? 1 : 0) }
}
