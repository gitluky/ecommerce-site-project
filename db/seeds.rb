require 'faker'

Category.destroy_all
Product.destroy_all

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
      new_product = category.products.create(name: Faker::Commerce.product_name, price: Faker::Commerce.price, description: "#{Faker::Commerce.color} #{Faker::Commerce.material}", stock: num)
      rand(1..4).times do
        image_name = "#{rand(1..185)}.jpg"
        new_product.product_images.attach(io: File.open("./app/assets/images/#{image_name}"), filename: "#{image_name}.jpg",)
      end
    end
  end
end
