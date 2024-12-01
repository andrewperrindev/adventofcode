# ADVENT OF CODE: Day 18, Part 2
# See README for context.
#
plans = File.readlines('trench.input.txt')
plans = plans.map { |line|
  line.strip.split
}

parsed_plans = []

# Parse out the instructions
plans.each do |plan|
  direction, length, color = plan
  hex = color[2..-3]
  dir_code = color[-2..-2]
  length = hex.to_i(16)

  case dir_code
  when '0'
    direction = 'R'
  when '1'
    direction = 'D'
  when '2'
    direction = 'L'
  when '3'
    direction = 'U'
  end

  parsed_plans.push({
    direction: direction,
    length: Integer(length)
  })
end

x = 0
y = 0
total_length = 1
vertices = [[x, y]]

# Figure out the total length of the border, as well
# as the location of the vertices.
while parsed_plans.length > 0 do
  current_plan = parsed_plans.shift
  total_length += current_plan[:length]

  case current_plan[:direction]
  when 'L'
    x = x - current_plan[:length]
  when 'R'
    x = x + current_plan[:length]
  when 'U'
    y = y - current_plan[:length]
  when 'D'
    y = y + current_plan[:length]
  end

  vertices.push([x, y])
end

# This area is too large to try and draw out & fill.
# Use the following equation instead:
# 2A = (x1y2 - x2y1) + (x2y3 - x3y2) + (x3y4 - x4y3) + ... + (xNy1 - x1yN)
# where A = Area & N = total number of vertices
vertices.push(vertices[0])
x1, y1 = vertices.shift
total = 0
while vertices.length > 0 do
  x2, y2 = vertices.shift

  total += (x1 * y2 - x2 * y1)

  x1 = x2
  y1 = y2
end

# Total area must also include the border.
# Equation calculates 2A, so divide by two.
# Extra 1 accounts for starting space.
puts ((total + total_length) / 2) + 1
