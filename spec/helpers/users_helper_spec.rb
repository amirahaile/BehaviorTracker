require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the UsersHelper. For example:
#
# describe UsersHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe UsersHelper, type: :helper do
  describe "error_check(attribute)" do
    it "returns nil if there are no matching attributes" do
      @user = build :user
      expect(helper.error_check(:first_name)).to be nil
    end

    it "returns the error message of a specific attribute" do
      @user = build :user, first_name: nil, email: nil
      @user.save
      expect(helper.error_check(:email)).to eq "Email can't be blank."
    end

    it "returns a string" do
      @user = build :user, first_name: nil, email: nil
      @user.save
      expect(helper.error_check(:email)).to be_kind_of String
    end
  end
end
