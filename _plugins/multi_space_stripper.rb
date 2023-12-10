module Jekyll
	module MultiSpaceStripper
	  def strip_multi_spaces(input)
		input.gsub(/\s+/, ' ')
	  end
	end
  end
  
  Liquid::Template.register_filter(Jekyll::MultiSpaceStripper)
  