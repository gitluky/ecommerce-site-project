class OrdersController < ApplicationController

  def index

  end

  def new
    @order = current_user.orders.build(cart: current_cart)
    @order.build_shipping_address()
    @stripe = ENV['STRIPE_SECRET_KEY']
    respond_to do |format|
      format.json { render 'orders/new.html.erb', layout: false }
      format.any { redirect_to root_path}
    end
  end

  def create
    order = current_user.orders.build(order_params)
    order.cart = current_cart
    current_user.add_shipping_address(order.shipping_address)
    if order.save
      all_line_items = current_cart.line_items_array

      Stripe.api_key = ENV['STRIPE_PUBLISHABLE_KEY']

      session = Stripe::Checkout::Session.create(
        customer_email: current_user.email,
        payment_method_types: ['card'],
        line_items: all_line_items,
        success_url: 'http://localhost:3000/success?order_id=' + "#{order.id}",
        cancel_url: 'http://localhost:3000/cancelled',
      )
    end
  end


  def success
    order = Order.find_by(id: params[:order_id])
    order.update(status: 'Successful')
    current_cart.update(checked_out: true)
    cart = current_user.carts.create()
    session[:cart_id] = cart.id
    redirect_to root_path
  end

  def cancelled
    order = Order.find_by(id: params[:order_id])
    order.update(status: 'Cancelled')
    redirect root_path
  end

  private

  def order_params
    params.require(:order).permit(:shipping_address_id, shipping_address_attributes: [:street_1, :street_2, :city, :state, :zip_code])
  end

end
