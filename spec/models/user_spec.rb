require 'rails_helper'

RSpec.describe User, type: :model do
  describe "Associations" do
    it "has many Locations" do
      user = create :user
      location1 = Location.create(longitude: 2.37178, latitude: 48.87092)
      location2 = Location.create(longitude: 2.37822, latitude: 48.87470)
      user.locations << location1
      user.locations << location2

      expect(user.locations).to include location1
      expect(user.locations).to include location2
    end
  end

  describe "Validations" do
    let(:valid_user) { build :user }

    it "saves an object with first name" do
      expect(valid_user.valid?).to be true
    end

    it "doesn't save an object without a first name" do
      user = build :user, first_name: nil
      expect(user.valid?).to be false
      expect(user.errors.keys).to include :first_name
    end

    it "doesn't require a last name" do
      user = build :user, last_name: nil
      expect(user.valid?).to be true
    end

    it "saves an object with an email" do
      expect(valid_user.valid?).to be true
    end

    it "doesn't save identical emails" do
      valid_user.save
      duplicate_user = build :user

      expect(duplicate_user.valid?).to be false
      expect(duplicate_user.errors.keys).to include :email
    end

    # email has an @ symbol followed by a period

    it "doesn't save an object without an email" do
      user = build :user, email: nil
      expect(user.valid?).to be false
      expect(user.errors.keys).to include :email
    end

    it "saves an object with a password and password confirmation" do
      expect(valid_user.valid?).to be true
    end

    it "doesn't save an object without a password or password confirmation" do
      user = build :user, password: nil, password_confirmation: nil
      expect(user.valid?).to be false
      expect(user.errors.keys).to include :password
      expect(user.errors.keys).to include :password_confirmation
    end

    # passwords have to match

    # password includes a special character and a number?
  end
end
