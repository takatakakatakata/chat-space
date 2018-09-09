FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/spec/fixtures/IMG_8234.jpg")
    user
    group
  end
end
