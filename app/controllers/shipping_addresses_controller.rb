class ShippingAddressesController < ApplicationController

  def create

  end

  def remove_address
   user = current_user
   address = ShippingAddress.find_by(id: params[:id])
   user.shipping_addresses.delete(address)
   render json: user
  end

  def destroy
    shipping_address = ShippingAddress.find_by(id: params[:id])
    shipping_address.destroy
    redirect_to root_path
  end

  private

  def shipping_address_params
    params.require(:shipping_address).permit(:street_1, :street_2, :city, :state, :zip_code)
  end

end
