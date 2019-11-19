class OrdersController < ApplicationController
  layout false

  def index

  end

  def new
    @order = current_user.orders.build(cart: current_cart)
    @order.build_shipping_address()
  end

  def create

    order = current_user.orders.build(order_params)
    order.cart = current_cart
    if order.save
      all_line_items = []
      current_cart.line_items.map do |line_item|
        all_line_items << {
          name: line_item.product.name,
          description: line_item.product.description,
          images: line_item.product.thumbnails,
          amount: (line_item.product.price * 100).to_i,
          currency: 'usd',
          quantity: line_item.quantity,
        }
      end

      Stripe.api_key = 'sk_test_4KuSH7gN4wV0AjptW4RDlcji00Cq3wdxn6'

      session = Stripe::Checkout::Session.create(
        customer_email: current_user.email,
        payment_method_types: ['card'],
        line_items: all_line_items,
        success_url: 'http://localhost:3000/success?order_id=' + "#{order.id}",
        cancel_url: 'http://localhost:3000/cancelled',
      )
      render json: session
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
