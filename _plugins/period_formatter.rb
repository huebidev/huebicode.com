module Jekyll
	module PeriodFormatter
	  def format_periods(input)
		input.gsub(/(\w)\.([A-Z])/, '\1. \2')
	  end
	end
  end
  
  Liquid::Template.register_filter(Jekyll::PeriodFormatter)
  