# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  layout false
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
    cart = @user.carts.create()
    session[:cart_id] = cart.id
  end

  # DELETE /resource/sign_out
  def destroy
    if !!current_cart && !current_cart.checked_out
      current_cart.destroy
    end
    super
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
