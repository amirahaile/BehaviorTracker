require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the LocationsHelper. For example:
#
# describe LocationsHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe LocationsHelper, type: :helper do
  describe "#counter(item, items)" do
    before :each do
      @locations = [];

      5.times do
        location = create :location
        @locations.push(location)
      end

      @location = @locations.sample

    end

    it "returns the placenumber the item holds in the array" do
      placenumber = @locations.index(@location) + 1
      expect(helper.counter(@location, @locations)).to eq placenumber
    end

    context "when a location has been deleted" do
      it "returns the placenumber the item holds in the array" do
        @locations.pop
        location = @locations.sample
        placenumber = @locations.index(location) + 1

        expect(helper.counter(location, @locations)).to eq placenumber
      end
    end

    context "when a location has been added" do
      it "returns the placenumber the item holds in the array" do
        new_location = create :location
        @locations.push(new_location)
        location = @locations.sample
        placenumber = @locations.index(location) + 1
        
        expect(helper.counter(location, @locations)).to eq placenumber
      end
    end
  end
end
