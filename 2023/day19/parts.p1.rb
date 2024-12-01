# ADVENT OF CODE: Day 19, Part 1
# See README for context.
#
parts = File.readlines('parts.input.txt')

def parse_input(parts)
  # first part of input are the workflows
  conditions = {}
  line = parts.shift

  while (line && line.strip != '')
    # Pattern describing the format of a workflow
    pattern = /^([a-z]+)\{(.+)\}$/
    line.match(pattern) do |matches|
      name, conditionString = matches.captures
      # Initialie workflow with no conditions
      conditions[name] = {}

      # Each condition is separated by a comma
      condition_list = conditionString.split(',')

      # For each condition, determine the rating required to pass
      # and which workflow/endstate to procced with if it passes.
      condition_list.each_with_index do |condition, index|
        predicate, result = condition.split(':')
        if (predicate && result)
          var, num = predicate.split('<')
          # Use functions for easy processing of comparisons.
          # Note that a workflow could specify a rating multiple times,
          # so de-dup with an index.
          if (var && num)
            conditions[name]["#{var}#{index}"] = Proc.new {|input| input < Integer(num) ? result : nil}
          else
            var, num = predicate.split('>')
            conditions[name]["#{var}#{index}"] = Proc.new {|input| input > Integer(num) ? result : nil}
          end
        else
          conditions[name][:default] = predicate
        end
      end
    end

    line = parts.shift
  end

  # Next, process the parts.
  # Each part has N ratings.
  # Parse each rating and add to array.
  parts_list = []
  parts.each do |line|
    part_line = line.strip[1..-2]
    part_descr = {}
    part_params = part_line.split(',')
    part_params.each do |part|
      attr, value = part.split('=')
      part_descr[attr] = Integer(value)
    end
    parts_list.push(part_descr)
  end

  return [conditions, parts_list]
end

# Run all the parts through the workflows.
def process_parts(conditions, parts)
  parts.map do |part|
    condition = conditions['in']
    while condition do
      result = condition.keys.reduce(nil) do |next_con, key|
        if (!next_con)
          if (key == :default)
            condition[key]
          else
            # Remove de-dup index
            adj_key = key[0]
            if (part[adj_key])
              condition[key].call(part[adj_key])
            end
          end
        else
          next_con
        end
      end
      if result != 'A' && result != 'R'
        condition = conditions[result]
      else
        break
      end
    end
    result
  end
end

total = 0
conditions, parts_list = parse_input(parts)
puts process_parts(conditions, parts_list).each_with_index.reduce(0) { |total, (n, index)|
  if (n == 'A')
    total += parts_list[index].values.sum
  end
  total
}
