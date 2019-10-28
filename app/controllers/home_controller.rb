class HomeController < ApplicationController
  def index
    @hot_deals = Category.find_by(name: 'Hot Deals')
    @categories = Category.ordered_categories
  end
end
