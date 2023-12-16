# ADVENT OF CODE: Day 15, Part 2
# (Part 1 is essentially the `calculateHash` function)
# See README for context.
#
def calculateHash(code)
  value = 0
  code.each_byte do |ascii|
    value += ascii
    value *= 17
    value %= 256
  end
  return value
end

def process_code(box_info, label, operation, focal_length)
  if box_info.nil?
    box_info = {order: [], lengths: {}}
  end

  if operation == '-'
    box_info[:order].delete label
    box_info[:lengths].delete label
  elsif operation == '='
    if !box_info[:lengths].has_key? label
      box_info[:order].push(label)
      box_info[:lengths][label] = Integer(focal_length)
    elsif
      box_info[:lengths][label] = Integer(focal_length)
    end
  end

  return box_info
end

def calculate_power(boxes)
  total = 0
  boxes.each_index do |index|
    box = boxes.at(index)
    if !box.nil?
      box[:order].each_index do |label_index|
        label = box[:order][label_index]
        total += (index + 1) * (label_index + 1) * (box[:lengths][label])
        # puts total
      end
    end
  end

  return total;
end

init = File.read('init.example.txt')

boxes = Array.new(256);
pattern = /([a-zA-Z]+)([\-=])([0-9]?)/;

init.split(',').each do |code|
  label = operation = focalLength = nil;
  code.match(pattern) { |m|
    label, operation, focalLength = m.captures
  }

  if label
    hashCode = calculateHash(label)
    boxInfo = boxes.at(hashCode)
    boxes[hashCode] = process_code(boxInfo, label, operation, focalLength)
  end
end

total = calculate_power(boxes)
puts "TOTAL: #{total}"
