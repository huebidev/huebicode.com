module Jekyll
    module RemoveHeadersFilter
        def remove_headers(input)
            require 'nokogiri'

            doc = Nokogiri::HTML.fragment(input)

            doc.css('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'time').each(&:remove)

            doc.to_s
        end
    end
end

Liquid::Template.register_filter(Jekyll::RemoveHeadersFilter)
