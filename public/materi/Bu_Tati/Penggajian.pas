program PenggajianKaryawan;
{I.S.:  pengguna memasukan bulan dan tahun penggajian, beserta nomor induk karyawan (NIK),
        nama karyawan (Nama), golongan (Gol), dan jam kerja satu bulan (JamKerja) 
        }

{F.S.: menampilakan gaji bersih seseorang karyawan }
uses crt;

var
    Bulan, Tahun, NIK, Nama, BesarTunjangan: string;
    Gol: integer;
    GajiPokok, JamLembur: LongInt;
    JamKerja, JamKurang, UangLembur, UangPotongan, Hari, Sisa: LongInt;
    Tunjangan, GajiBersih: real;

begin
    clrscr;
    textcolor(lightblue);
    writeln('------ [ Penggajian Karyawan ] ------');
    textcolor(white);
    writeln;

    // Input data
    write('Bulan Penggajian         : '); readln(Bulan);
    write('Tahun Penggajian         : '); readln(Tahun);
    write('Nik                      : '); readln(NIK);
    write('Nama Karyawan            : '); readln(Nama);
    write('Golongan                 : '); readln(Gol);
    write('Jumlah Jam Kerja/Bulan   : '); readln(JamKerja);
    writeln;

    // Menentukan gaji pokok dan tunjangan
    if Gol = 1 then
    begin
        GajiPokok := 1750000;
        BesarTunjangan := '12.5%';
        Tunjangan := GajiPokok * 0.125;
    end
    else
    begin
        GajiPokok := 2300000;
        BesarTunjangan := '15%';
        Tunjangan := GajiPokok * 0.15;
    end;

    // Menghitung jam lembur dan uang lembur
    if JamKerja > 208 then
    begin
        JamLembur := JamKerja - 208;
        UangLembur := JamLembur * 25000;
    end
    else
    begin
        JamLembur := 0;
        UangLembur := 0;
    end;

    // Menghitung jam kurang dan potongan
    if JamKerja < 208 then
    begin
        JamKurang := 208 - JamKerja;
        if JamKurang > 8 then
        begin
            Hari := JamKurang div 8;
            Sisa := JamKurang mod 8;
            UangPotongan := Hari * 50000 + Sisa * 10000;
        end
        else
            UangPotongan := JamKurang * 10000;
    end
    else
        UangPotongan := 0;

    // Menghitung gaji bersih
    GajiBersih := GajiPokok + Tunjangan + UangLembur - UangPotongan;

    // Menampilkan slip gaji
    clrscr;
    writeln;
    writeln('                   SLIP GAJI');
    writeln('                 -------------');
    writeln;
    writeln('Bulan : ', Bulan:10,'      Tahun : ', Tahun:18);
    writeln('NIK   : ', NIK:10, '      Nama  : ', Nama:18);
    writeln;
    writeln('--------------------------------------------------');
    writeln('Golongan               : ', Gol);
    writeln('Jumlah Jam Kerja/Bulan : ', JamKerja);
    writeln('Gaji Pokok             : Rp. ', GajiPokok);
    writeln('Tunjangan  ', BesarTunjangan:5, '       : Rp. ', Tunjangan:0:2);
    writeln('Uang Lembur            : Rp. ', UangLembur);
    writeln('Uang Potongan          : Rp. ', UangPotongan);
    writeln('--------------------------------------------------');
    writeln('Gaji Bersih            : Rp. ', GajiBersih:0:2);
    textcolor(lightgreen);
    textcolor(white);

    readln;
end.
