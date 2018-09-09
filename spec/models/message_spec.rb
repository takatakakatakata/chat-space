require 'rails_helper'

describe Message, type: :model do
  describe '#create' do
    context "validate can" do
      it "is valid if body presence"do
        expect(build(:message, image: nil)).to be_valid
      end
      it "is valid if image presence" do 
        message = build(:message,body: nil)
        message.valid?
        expect(message).to be_valid
      end
      it "is valid if image body presence" do 
        message = build(:message)
        message.valid?
        expect(message).to be_valid
      end
  end
  context "validate can't" do 
    it "is invalid image body both absence" do  
      message = build(:message,image:nil,body:nil)
      message.valid?
      expect(message.errors[:body]).to include("can't be blank")
    end
    it "is invalid group_id absence" do  
      message = build(:message,group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("must exist")
    end
    it "is invalid user_id absence" do
    message = build(:message,user_id:nil)
    message.valid?
    expect(message.errors[:user]).to include("must exist")
  end
  end
 end
end
