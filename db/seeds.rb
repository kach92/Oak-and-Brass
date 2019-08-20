# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Furniture.create(
    :name => 'Lidhult', :price => 1359.00, :category => 'Sofa', :img_url => 'https://www.ikea.com/PIAimages/0619145_PE688945_S5.JPG?f=m')
Furniture.create(
    :name => 'Vimle', :price => 830.00, :category => 'Sofa', :img_url => 'https://www.ikea.com/PIAimages/0725527_PE734920_S5.JPG?f=l')
Furniture.create(
    :name => 'Havsta', :price => 490.00, :category => 'Cabinet', :img_url => 'https://www.ikea.com/PIAimages/0675394_PE718310_S5.JPG?f=l')



FurnitureOption.create(:capacity => "2-seater", :color => "Beige", :furniture_id => 1, :image =>'https://www.ikea.com/PIAimages/0619145_PE688945_S5.JPG?f=m',:price => 1359.00, :width => 208.00, :height => 102, :length => 200)
FurnitureOption.create(:capacity => "3-seater", :color => "Beige", :furniture_id => 1, :image =>'https://www.ikea.com/PIAimages/0620132_PE689443_S5.JPG?f=m',:price => 2059.00, :width => 208.00, :height => 102, :length => 300)
FurnitureOption.create(:capacity => "2-seater", :color => "Blue", :furniture_id => 1, :image =>'https://www.ikea.com/PIAimages/0619131_PE688941_S5.JPG?f=m',:price => 1359.00, :width => 208.00, :height => 102, :length => 200)
FurnitureOption.create(:capacity => "3-seater", :color => "Blue", :furniture_id => 1, :image =>'https://www.ikea.com/PIAimages/0620129_PE689440_S5.JPG?f=m',:price => 2059.00, :width => 208.00, :height => 102, :length => 300)

FurnitureOption.create(:capacity => "3-seater", :color => "Dalstorp multicolor", :furniture_id => 2, :image =>'https://www.ikea.com/PIAimages/0725527_PE734920_S5.JPG?f=l',:price => 830.00, :width => 241.00, :height => 83, :length => 211)
FurnitureOption.create(:capacity => "3-seater", :color => "Farsta dark brown", :furniture_id => 2, :image =>'https://www.ikea.com/PIAimages/0514392_PE639462_S5.JPG?f=l',:price => 880.00, :width => 241.00, :height => 83, :length => 300)
FurnitureOption.create(:capacity => "3-seater", :color => "Gunnared medium grey", :furniture_id => 2, :image =>'https://www.ikea.com/PIAimages/0514368_PE639441_S5.JPG?f=l',:price => 850.00, :width => 241.00, :height => 83, :length => 200)
FurnitureOption.create(:capacity => "4-seater", :color => "Dalstorp multicolor", :furniture_id => 2, :image =>'https://www.ikea.com/PIAimages/0766712_PE753877_S5.JPG?f=l',:price => 1750.00, :width => 235.00, :height => 83, :length => 300)
FurnitureOption.create(:capacity => "4-seater", :color => "Farsta dark brown", :furniture_id => 2, :image =>'https://www.ikea.com/PIAimages/0579268_PE675219_S5.JPG?f=l',:price => 1750.00, :width => 235.00, :height => 83, :length => 300)
FurnitureOption.create(:capacity => "4-seater", :color => "Gunnared medium grey", :furniture_id => 2, :image =>'https://www.ikea.com/PIAimages/0579267_PE675221_S5.JPG?f=l',:price => 1830.00, :width => 235.00, :height => 83, :length => 300)
FurnitureOption.create(:kuan => "with doors", :color => "White", :furniture_id => 3, :image =>'https://www.ikea.com/PIAimages/0675394_PE718310_S5.JPG?f=l',:price => 490.00, :width => 47.00, :height => 212.00, :length => 81.00)
FurnitureOption.create(:kuan => "with doors", :color => "Dark Brown", :furniture_id => 3, :image =>'https://www.ikea.com/PIAimages/0626912_PE693102_S5.JPG?f=l',:price => 490.00, :width => 47.00, :height => 212.00, :length => 81.00)
FurnitureOption.create(:kuan => "w glass-doors", :color => "White", :furniture_id => 3, :image =>'https://www.ikea.com/PIAimages/0675391_PE718312_S5.JPG?f=l',:price => 510.00, :width => 47.00, :height => 212.00, :length => 81.00)
FurnitureOption.create(:kuan => "w glass-doors", :color => "Dark Brown", :furniture_id => 3, :image =>'https://www.ikea.com/PIAimages/0626909_PE693101_S5.JPG?f=xxxl',:price => 510.00, :width => 47.00, :height => 212.00, :length => 81.00)

MainCategory.create(:title =>"Furnitures")#1
MainCategory.create(:title =>"Accessories")#2
MainCategory.create(:title =>"Bath Room")#3
MainCategory.create(:title =>"Bed Room")#4
MainCategory.create(:title =>"Dining Room")#5
MainCategory.create(:title =>"Kitchen")#6
MainCategory.create(:title =>"Living Room")#7
MainCategory.create(:title =>"Study")#8

FurnituresMainCategory.create(:furniture_id => 1, :main_category_id => 1)
FurnituresMainCategory.create(:furniture_id => 1, :main_category_id => 7)
FurnituresMainCategory.create(:furniture_id => 2, :main_category_id => 1)
FurnituresMainCategory.create(:furniture_id => 2, :main_category_id => 7)
FurnituresMainCategory.create(:furniture_id => 3, :main_category_id => 1)
FurnituresMainCategory.create(:furniture_id => 3, :main_category_id => 5)
FurnituresMainCategory.create(:furniture_id => 3, :main_category_id => 6)
FurnituresMainCategory.create(:furniture_id => 3, :main_category_id => 8)
