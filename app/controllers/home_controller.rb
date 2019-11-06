class HomeController < ApplicationController
  def index
    @hot_deals = Category.find_by(name: 'Hot Deals')
    @categories = Category.ordered_categories
  end

  def navbar
    render partial: 'layouts/navbar'
  end

  def csrf
    render partial: 'layouts/csrf'
  end
end
