import os
from rich.panel import Panel
from rich import print as prints
from rich.table import Table

# Program Bilangan Ganjil atau Genap
# I.S.: pengguna memasukan bilangan 
# F.S.: Menampilkan keterangan "Bilangan Ganjil" atau "Bilangan Genap"

os.system('clear')
print('')
print('')
print('')

'''
prints(Panel.fit(f"[bold white]Data Penggajian Karyawan",style='bold blue'))

# Badan program
Bilangan = int(input(f"Masukan Bilangan : "))
Keterangan = 'Bilangan Ganjil'
if (Bilangan % 2) == 0:
    Keterangan = 'Bilangan Genap'
    prints(Panel.fit(f"[bold white]{Bilangan} adalah {Keterangan}",style='bold blue'))
else:
    prints(Panel.fit(f"[bold white]{Bilangan} adalah {Keterangan}",style='bold blue'))
    
'''

prints(Panel.fit(f"[bold white]Data Penggajian Karyawan",style='bold blue'))

# Badan program
# Analisis terhadap dua kasus
Bilangan = int(input(f"Masukan Bilangan : "))
if (Bilangan % 2) == 0:
    Keterangan = 'Bilangan Genap'
    prints(Panel.fit(f"[bold white]{Bilangan} adalah {Keterangan}",style='bold blue'))
else:
    Keterangan = 'Bilangan Ganjil'
    prints(Panel.fit(f"[bold white]{Bilangan} adalah {Keterangan}",style='bold blue'))