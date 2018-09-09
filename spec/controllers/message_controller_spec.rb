require 'rails_helper'
 describe MessagesController, type: :controller do 
  let(:user){create(:user)}
  let(:group){create(:group)}
    describe 'Get #index' do  
      context "user_log_in" do
        before do 
          login_user user
          get :index, params: { group_id: group.id }
        end

        it "user_sigin @message" do  
          expect(assigns(:message)).to be_a_new(Message)
        end

        it "user_login @group" do 
          expect(assigns(:group)).to eq group
        end

        it "render template index" do 
          expect(response).to render_template :index
        end
    end

    context "user don't log_in" do
      before do  
        get :index,params: {group_id: group.id}
      end
      it "renders the :index template" do  
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end

  describe '#create' do
    let(:params) {{group_id: group.id,user_id: user.id, message:attributes_for(:message)}}
    context 'log in' do  
      before do 
        login_user user 
      end
        context 'can save' do 
          subject{
            post :create,
            params: params
            } 

            it "count up message"  do  
              expect{subject}.to change(Message,:count).by(1)
            end

            it "redirects to group_messages_path " do 
              subject
              expect(response).to redirect_to group_messages_path(group)
            end

         end
       context "can't save" do  
        let(:invalid_params) {{group_id: group.id,user_id: user.id, message:attributes_for(:message,body:nil,image:nil)}}
         subject{
            post :create,
            params: invalid_params
          }

        it "don't count up" do
          expect{ subject }.not_to change(Message,:count) 
        end

        it "render template index" do 
          subject
          expect(response).to render_template :index
        end
      end
    end# end login

    context 'do not log in' do  
        it "redirect new_user_session_path" do  
          post :create, params: params
          expect(response).to redirect_to(new_user_session_path)
        end
    end
  end

end
