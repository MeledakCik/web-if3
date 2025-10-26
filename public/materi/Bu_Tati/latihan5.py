import os
# Program Menentukan keliling ligkarang
# I.S.: pennggunna memasukan diameter lingkaran dalam satuan sentimeter
# F.S.: menampilkan keliling lingkaran dari diameter dalam satuan meter

# badan program
os.system('clear')
Diameter = float(input("masukan diameter keliling lingkaran : "))
PHI = 3.14

Keliling = PHI * Diameter * 0.01

print("Menjumlahkan Keliling Lingkaran")
print(f'Diameter Lingkarang adalah ',Diameter)
print(f'Hasil dari keliling nya  ',Keliling)

