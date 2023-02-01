function Veriler() {
    var url = '/Home/Veriler';
    $('table').html();
    var thead = '<thead><tr><td>KOŞUL NO</td><td>ADI SOYAD</td><td>YAŞ</td></tr></thead>';
    $('table').append(thead);
    $.getJSON(url, function (data) {
        for (var item in data.Result) {
            var guncelle = '<button data-id='+ data.Result[item].KullaniciId +' class="btn btn-primary guncelle">Güncelle</button>';
            var checkox = '<input type="checkbox" name="secilmis" value=' + data.Result[item].KullaniciId + ' />';
            var deger = '<tbody><tr><td>' + checkox + '</td><td>' + data.Result[item].AdSoyad + '</td><td>' + data.Result[item].Yas + '</td><td>'+ guncelle +'</td></tr></tbody>';
            $('table').append(deger);
        }
    });
}


$(document).on("click", "#temizle", function () {
    $('table').html("");
});

$(document).on("click", "#yenile", function () {
    $('table').html("");
    Veriler();
});


$(document).on("click", "#ekle", async function () {
    const { value: formValues } = await Swal.fire({
        title: 'Kullanıcı Ekle',
        showCancelButton: true,
        cancelButtonColor: '#d43f3a',
        cancelButtonText: 'İptal',
        confirmButtonText: 'Onayla',
        confirmButtonColor: '#337ab7',
        html:
            '<input id="ad" placeholder="Ad Giriniz" class="swal2-input">' +
            '<input id="soyad" placeholder="Soyad Giriniz" class="swal2-input">' +
            '<input id="yas" placeholder="Yaş Giriniz"class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('ad').value,
                document.getElementById('soyad').value,
                document.getElementById('yas').value

            ]
        }
    })

    $.ajax({
        url: '/Home/EkleJson',
        type: 'Post',
        dataType: 'json',
        data: { ad: formValues[0], soyad: formValues[1], yas: formValues[2] },
        success: function (gelenDeger) {
            if (gelenDeger == '1') {
                Swal.fire({
                    icon: 'success',
                    title: 'Kayıt Eklendi',
                    text: 'İşlem Başarıyla Gerçekleşti!'
                })
                $("table").html("");
                Veriler();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Kayıt Eklenemedi',
                    text: 'İşlem Başarısız Oldu. Tekrar Deneyiniz!'
                })

            }
        }

    });

});

$(document).on("click", "#sil", function () {
    Swal.fire({
        title: 'Silmek İstediğinize Emin Misiniz?',
        text: "Seçilen Kullanıcı Silinecek",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'İptal',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Evet, Eminim'
    }).then((result) => {
        if (result.isConfirmed) {
            var data = [];
            var tr = [];
            var sayac = 0;
            $("input[name='secilmis']:checked").each(function () {
                data[sayac] = $(this).val();
                sayac++;
            });
            $.ajax({
                url: '/Home/SilJson',
                type: 'Post',
                dataType: 'json',
                data: { "data": data},
                 success: function (gelenDeger) {
                    if (gelenDeger == '1') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Kayıt Silindi',
                            text: 'İşlem Başarıyla Gerçekleşti!'
                        })
                        $("table").html("");
                        Veriler();
                    }

                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Kayıt Silinemedi',
                            text: 'İşlem Başarısız Oldu. Tekrar Deneyiniz!'
                        })

                    }
                }
            });
        }
    })
});


$(document).on("click", ".guncelle", async function () {
    var id = $(this).attr('data-id');
    $.ajax({
        url: '/Home/GuncelleJson',
        type: 'Post',
        dataType: 'json',
        data: { 'id': id },
        success: async function (data) {

            const { value: formValues } = await Swal.fire({
                title: 'Öğrenci Ekle',
                showCancelButton: true,
                cancelButtonColor: '#d43f3a',
                cancelButtonText: 'İptal',
                confirmButtonText: 'Onayla',
                confirmButtonColor: '#337ab7',
                html:
                    '<input id="ad" value=' + data.Result.Ad + ' placeholder="Ad Giriniz" class="swal2-input">' +
                    '<input id="soyad" value=' + data.Result.Soyad+' placeholder="Soyad Giriniz" class= "swal2-input" > ' +
                    '<input id="yas" value=' + data.Result.Yas +' placeholder="Yaş Giriniz"class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('ad').value,
                        document.getElementById('soyad').value,
                        document.getElementById('yas').value

                    ]
                }
            })
            $.ajax({
                url: '/Home/Guncelle',
                type: 'Post',
                dataType: 'json',
                data: { id:id, ad: formValues[0], soyad: formValues[1], yas: formValues[2] },
                success: function (gelenDeger) {
                    if (gelenDeger == '1') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Kayıt Güncellendi',
                            text: 'İşlem Başarıyla Gerçekleşti!'
                        })
                        $("table").html("");
                        Veriler();
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Kayıt Güncellenemedi',
                            text: 'İşlem Başarısız Oldu. Tekrar Deneyiniz!'
                        })

                    }
                }

            });
        }
    });

   
});



