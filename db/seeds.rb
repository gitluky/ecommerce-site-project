require 'faker'

20.times do
  category_name = Faker::Commerce.department(max: 1)
  if !Category.find_by(name: category_name)
    Category.create(name: category_name)
  end
end

Category.all.each do |category|
  num = rand(10..20)
  num.times do
    name = Faker::Commerce.product_name
    if !Product.find_by(name: name)
      category.products.create(name: Faker::Commerce.product_name, price: Faker::Commerce.price, description: "#{Faker::Commerce.color} #{Faker::Commerce.material}", stock: num)
    end
  end
end
