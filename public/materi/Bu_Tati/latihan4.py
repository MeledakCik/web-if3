import os
# Program Tukar Angka Menggunakan Variabel Tanpa Bantuan
# I.S.: user memasukan 2 angka 
# F.S.: Menampilkan hasil penukaran menggunakan tanpa variabel bantuan

# badan program
os.system('clear')
Angka1 = float(input("masukan angka pertama : "))
Angka2 = float(input("masukan angka kedua : "))

# proses pertukaran tanpa bantuan
Angka1 = Angka1 + Angka2
Angka2 = Angka1 - Angka2
Angka1 = Angka1 - Angka2

print("Dua Angka setelah bertukar")
print(f'Angka Pertama adalah ',Angka1)
print(f'Angka Kedua adalah ',Angka2)
print(f"Hasil Dari Pernukaran adalag : Angka pertama ", Angka1 , " dan Angka Kedua ", Angka2)

