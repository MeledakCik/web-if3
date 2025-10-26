program Menjumlahkan_dua_buah_angka;
{I.S.: User memasukkan 2 angka}
{F.S.: Menampilkan hasil penjumlahan }
uses crt;
// kamus
var
    Angka1, Angka2, Hasil: integer;
begin
    // memasukan dua angka secara tudak langsung
    write('Masukkan angka pertama = '); 
    readln(Angka1);
    write('Masukkan angka kedua   = '); 
    readln(Angka2);

    // menjumlahkan Angka1 dan Angka2
    Hasil := Angka1 + Angka2;

    // Menampilkan hasil penjumlahan
    writeln('Hasil Penjumlahan = ', Angka1, ' + ', Angka2);
    writeln('                   = ', Hasil);
    readln;
end.
