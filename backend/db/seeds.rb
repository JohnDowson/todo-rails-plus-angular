# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
projects = {
  'Семья' => [
    ['Купить молоко',
     false],
    ['Заменить масло в двигателе до 23 апреля',
     false],
    ['Отправить письмо бабушке',
     true],
    ['Заплатить за квартиру',
     false],
    ['Забрать обувь из ремонта',
     false]
  ],
  'Работа' => [
    ['Позвонить заказчику',
     true],
    ['Отправить документы',
     true],
    ['Заполнить отчет',
     false]
  ],
  'Прочее' => [
    ['Позвонить другу',
     false],
    ['Подготовиться к поездке',
     false]
  ]
}

projects.each do |name, todos|
  project = Project.create(title: name)
  todos.each do |text, completed|
    Todo.create(text: text, completed: completed, project: project)
  end
end
