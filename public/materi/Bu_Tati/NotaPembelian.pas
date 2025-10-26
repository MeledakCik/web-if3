program NotaPembelian;
{I.S.:  pengguna memasukan no. transaksi,tanggal dan ketiga data 
        barang yang di beli oleh seseorang pelanggan yang terdiri dari 
        kode barang (KodeBrg), nama barang (NamaBrg), jumlah yang
        dibeli dan harga satuan setiap barang }

{F.S.: menampilkan nota pembelian untuk seseorang pelanggan }
uses crt;
var
    NoTransaksi, Tanggal: string;
    KodeBrg1, KodeBrg2, KodeBrg3: string;
    NamaBrg1, NamaBrg2, NamaBrg3: string;
    JumlahBeli1, JumlahBeli2, JumlahBeli3: real;
    HargaSatuan1, HargaSatuan2, HargaSatuan3: real;
    HargaTotal1, HargaTotal2, HargaTotal3: real;
    TotalPembelian: real;

begin
    clrscr;
    textcolor(white);
    write('Masukkan No. Transaksi : '); readln(NoTransaksi);
    write('Masukkan Tanggal       : '); readln(Tanggal);
    writeln;

    { Memasukan data barang pertama }
    textcolor(lightblue);
    writeln('------ [ Data Barang 1 ] ------');
    textcolor(white);
    write('Kode Barang    : '); readln(KodeBrg1);
    write('Nama Barang    : '); readln(NamaBrg1);
    write('Jumlah Beli    : '); readln(JumlahBeli1);
    write('Harga Satuan   : Rp. '); readln(HargaSatuan1);
    HargaTotal1 := HargaSatuan1 * JumlahBeli1;
    writeln('Harga Total    : Rp. ', HargaTotal1:0:0);
    writeln;

    { Memasukan data barang kedua }
    textcolor(yellow);
    writeln('------ [ Data Barang 2 ] ------');
    textcolor(white);
    write('Kode Barang    : '); readln(KodeBrg2);
    write('Nama Barang    : '); readln(NamaBrg2);
    write('Jumlah Beli    : '); readln(JumlahBeli2);
    write('Harga Satuan   : Rp. '); readln(HargaSatuan2);
    HargaTotal2 := HargaSatuan2 * JumlahBeli2;
    writeln('Harga Total    : Rp. ', HargaTotal2:0:0);
    writeln;

    { Memasukan data barang ketiga }
    textcolor(green);
    writeln('------ [ Data Barang 3 ] ------');
    textcolor(white);
    write('Kode Barang    : '); readln(KodeBrg3);
    write('Nama Barang    : '); readln(NamaBrg3);
    write('Jumlah Beli    : '); readln(JumlahBeli3);
    write('Harga Satuan   : Rp. '); readln(HargaSatuan3);
    HargaTotal3 := HargaSatuan3 * JumlahBeli3;
    writeln('Harga Total    : Rp. ', HargaTotal3:0:0);
    writeln;

    { Menghitung total pembelian }
    TotalPembelian := HargaTotal1 + HargaTotal2 + HargaTotal3;

    { Tampilkan nota pembelian }
    textcolor(lightcyan);
    textcolor(white);
    writeln('No. Transaksi : ', NoTransaksi);
    writeln('Tanggal       : ', Tanggal);
    writeln;
    writeln('Kode    Nama Barang      Jumlah   Total (Rp)');
    writeln('---------------------------------------------');
    writeln(KodeBrg1:5, '  ', NamaBrg1:15, '  ', JumlahBeli1:6:0, '   ', HargaTotal1:10:0);
    writeln(KodeBrg2:5, '  ', NamaBrg2:15, '  ', JumlahBeli2:6:0, '   ', HargaTotal2:10:0);
    writeln(KodeBrg3:5, '  ', NamaBrg3:15, '  ', JumlahBeli3:6:0, '   ', HargaTotal3:10:0);
    writeln('Total Pembelian semua barang : Rp. ', TotalPembelian:0:0);
    writeln('---------------------------------------------');
    textcolor(lightgreen);
    textcolor(white);

    readln;
end.
