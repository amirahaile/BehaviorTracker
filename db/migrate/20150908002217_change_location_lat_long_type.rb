class ChangeLocationLatLongType < ActiveRecord::Migration
  def change
    change_column :locations, :latitude, :decimal, precision: 7, scale: 5
    change_column :locations, :longitude, :decimal, precision: 7, scale: 5
  end
end
