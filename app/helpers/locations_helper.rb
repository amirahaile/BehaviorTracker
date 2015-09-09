module LocationsHelper

  def counter(item, items)
    index = items.index(item)
    index + 1
  end
end
