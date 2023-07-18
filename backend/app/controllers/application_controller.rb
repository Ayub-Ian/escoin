class ApplicationController < ActionController::API
    wrap_parameters format: []
    include ActionController::Cookies

    def authorize_request
        header = request.headers['Authorization']
        token = header.split(' ').last if header
        begin
          decoded = JsonWebToken.decode(token)
        rescue ActiveRecord::RecordNotFound => e
          render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
          render json: { errors: e.message }, status: :unauthorized
        end
    end

    private 

    def current_user
        @_current_user ||= session[:current_user_id] &&
          User.find_by(id: session[:current_user_id])
    end
end
