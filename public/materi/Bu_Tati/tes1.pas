program Menjumlahkan_dua_buah_angka;
{I.S.: diberikan harga terhadap variabel Angka1 = 5 dan variabel Angka2 = 2 }
{F.S.: Menampilkan hasil penjumlahan }
uses crt;
// kamus
var
    Angka1, Angka2, Hasil: integer;
begin
    // Memasukan dua angka langsung
    Angka1 := 5;
    Angka2 := 2;

    // menjumlahkan Angka1 dan Angka2
    Hasil := Angka1 + Angka2;

    // Menampilkan hasil penjumlahan
    writeln('Hasil Penjumlahan = ', Angka1, ' + ', Angka2);
    writeln('                   = ', Hasil);

    readln;
end.
