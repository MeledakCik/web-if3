import os
from rich.panel import Panel
from rich import print as prints

JamLembur, UangLembur, JamKurang, UangPotongan = 0, 0, 0, 0

os.system('clear')
os.system('clear')
print(f"\t<< Data Penggajian Karyawan >>\n")

Bulan    = str(input("Bulan Penggajian       : "))
Tahun    = str(input("Tahun Penggajian       : "))
NIK      = str(input("Nomor Induk Karyawan   : "))
Nama     = str(input("Nama Karyawan          : "))
Gol      = int(input("Golongan               : "))
JamKerja = int(input("Jumlah Jam Kerja/Bulan : "))

# Menentukan gaji pokok dan tunjangan
if Gol == 1:
    GajiPokok = 1750000
    BesarTunjangan = "12.5%"
    Tunjangan = 0.125 * GajiPokok
else:
    GajiPokok = 2300000
    BesarTunjangan = "15%"
    Tunjangan = 0.15 * GajiPokok

# Menghitung jam lembur dan uang lembur
if JamKerja > 208:
    JamLembur = JamKerja - 208
    UangLembur = JamLembur * 25000

# Menghitung jam kurang
if JamKerja < 208:
    JamKurang = 208 - JamKerja

# Menghitung uang potongan
if JamKurang >= 8:
    Hari = JamKurang // 8
    Sisa = JamKurang % 8
    UangPotongan = Hari * 50000 + Sisa * 10000
else:
    UangPotongan = JamKurang * 10000

# Menghitung gaji bersih
GajiBersih = GajiPokok + Tunjangan + UangLembur - UangPotongan


def jamlembur(JamLembur, UangLembur):
    if JamLembur > 0 and UangLembur > 0:
        return  f"Lembur                  : {JamLembur} Jam\n" \
                f"                        : Rp. {UangLembur:,.0f}"
    else:
        return  f"Lembur                  : {JamLembur} Jam"

def jamkurang(JamKurang, UangPotongan):
    if JamKurang > 0 and UangPotongan > 0:
        return  f"Potongan                : {JamKurang} Jam\n" \
                f"                            : Rp. {UangPotongan:,.0f}"
    else:
        return  f"Potongan                :  Rp. {UangPotongan:,.0f}"

    
print('\n')
# Menyusun seluruh data menjadi satu string untuk Panel
slip_gaji = f"""[bold white]
\t             SLIP GAJI
\t           ─────────────

    Bulan : {Bulan:<15}       Tahun : {Tahun:<10}
    NIK   : {NIK:<15}       Nama  : {Nama:<15}

    Golongan                : {Gol}
    Jumlah Jam Kerja/Bulan  : {JamKerja} Jam
    Gaji Pokok              : Rp. {GajiPokok:,.0f}
    Tunjangan {BesarTunjangan:<6}        : Rp. {Tunjangan:,.2f}
    {jamlembur(JamLembur,UangLembur)}
    {jamkurang(JamKurang, UangPotongan)}

    ───────────────────────────────────────────────
    Gaji Bersih             : Rp. {GajiBersih:,.2f}
    ───────────────────────────────────────────────
"""

prints(Panel.fit(slip_gaji,style="bold blue"))
