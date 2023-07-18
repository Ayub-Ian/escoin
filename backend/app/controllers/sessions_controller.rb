class SessionsController < ApplicationController

    # POST /login
    def create 
        user = User.find_by(email: login_params[:email])
        if user
            if user.authenticate(login_params[:password]) 
                session[:current_user_id] = user.id
                token = JsonWebToken.encode(user_id: user.id, email: user.email)
                render json: {user: user, token: token}, status: :ok
            else
                render json: {error: "Wrong password entered"}, status: :unprocessable_entity
            end
        else
            render json: {error: "No user with provided email"}, status: :not_found
        end
    end

    # DELETE /logout 
    def destroy
        # Remove the user id from the session
        session.delete(:current_user_id)
        # Clear the memoized current user
        @_current_user = nil
    end

    # GET /current_user
    def me
        user = User.find_by(id: session[:current_user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Please log in"}, status: :unauthorized
        end
    end

    private

    def login_params
        params.permit(:email, :password)
    end
end
