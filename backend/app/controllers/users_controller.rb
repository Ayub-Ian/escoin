class UsersController < ApplicationController
    before_action :authorize_request, except: %i[create]
    before_action :find_user, except: %i[create index]
    # GET /users = all users
    def index
        users = User.all
        render json: {data: users}, status: :ok
    end

    # POST /users = create user
    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end

    end

    # GET /users/:id = single user using id
    def show
        render json: @user
    end
    
    # PUT /users/:id = update user using id
    def update
        unless @user.update(user_params)
            render json: { errors: @user.errors.full_messages },
                    status: :unprocessable_entity
        end
    end

    # DELETE /users/:id = delete a user
    def destroy
        @user.destroy!
        head :no_content
    end

    private
    def find_user
        @user = User.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { errors: 'User not found' }, status: :not_found
    end

    def user_params
        params.permit(:firstname, :lastname, :phone_number, :email, :password)
    end
end
