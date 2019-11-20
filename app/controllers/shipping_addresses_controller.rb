class ShippingAddressesController < ApplicationController

  def create

  end

  def remove_address
   user = current_user
   address = ShippingAddress.find_by(id: params[:id])
   user.shipping_addresses.delete(address)
   render json: user
  end

  def user_addresses
    render partial: 'user_addresses', locals: { current_user: current_user }
  end

  private

  def shipping_address_params
    params.require(:shipping_address).permit(:street_1, :street_2, :city, :state, :zip_code)
  end

end
