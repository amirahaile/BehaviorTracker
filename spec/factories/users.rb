FactoryGirl.define do
  factory :user do
    first_name "Rose"
    last_name "Nylund"
    email "betty@goldengirls.com"
    password "i<3stOlaf"
    password_confirmation "i<3stOlaf"
  end
end
