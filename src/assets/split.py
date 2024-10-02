from PIL import Image

img = Image.open('src/assets/pieces.jpg')
rows, cols = 2, 6
w, h = img.width // cols, img.height // rows
print(w, h, img.width, img.height)
i = 1
for row in range(rows):
  y = row * h
  for col in range(cols):
    x = col * w
    print(x, y)
    sub = img.copy().crop(box=(x,y,x+w,y+h))
    with open(f'piece_{i}.png', 'wb') as f:
      sub.save(f, 'png')
    i += 1
print('Done!')