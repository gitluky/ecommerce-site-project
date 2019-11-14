class OrdersController < ApplicationController
  layout false

  def new
    @order = Order.new(cart: current_cart)


  end

  def create
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
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancelled',
    )
    render json: session
  end


  def success


  end

  def cancelled

  end

end
