class Location < ActiveRecord::Base
# Associations -----------------------------------------------------------------
  belongs_to :user

# Validations ------------------------------------------------------------------
  # TODO: get a sample to set proper validations

# Class Methods ----------------------------------------------------------------
  # thanks @segdeha - http://andrew.hedges.name/experiments/haversine/
  # and http://www.movable-type.co.uk/scripts/latlong.html
  def calc_distance(location1, location2)
    # convert to radians
    lat1  = deg2Radian(location1.latitude)
    long1 = deg2Radian(location1.longitude)
    lat2  = deg2Radian(location2.latitude)
    long2 = deg2Radian(location2.longitude)

    # find difference
    lat_distance  = lat2 - lat1
    long_distance = long2 - long1

    # Haversine formula
    R = 3959 # earth's radius in miles
    a = (Math.sin(lat_distance / 2) ** 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        (Math.sin(long_distance / 2) ** 2)
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    distance = R * c

    # rounds to the nearest thousandths
    distance.round(3)
  end

  private

  def deg2Radian(degree)
    degree * Math.PI / 180 # 360deg / 2 = 180deg
  end
end
