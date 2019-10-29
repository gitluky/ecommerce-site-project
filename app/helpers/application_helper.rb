module ApplicationHelper

  def current_cart
    @current_cart ||= Cart.find_by(id: session[:cart_id]) if session[:cart_id]
  end
end
