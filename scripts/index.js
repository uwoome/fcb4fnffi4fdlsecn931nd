var currentIdol = ''

window.onload = function() {
    $('#liveToast').toast('show')
};

$(document).ready(function(){
    var url = location.href;
    if (url.indexOf('?') != -1) {
        var gotWord = false;
        var word = "";
        var ary = url.split('?')[1].split('&');
        const aryLength = ary.length;
        for(var i = 0; i < aryLength; i++) {
            if(ary[i].split('=')[0] == 'q') {
                word = decodeURIComponent(ary[i].split('=')[1]);
                gotWord = true;
            }
        }
        if (gotWord) {
            $('#filterWord').val(word)
            var filterWord = setTimelineItemVisibility(false)
            $('#filterInput').text(filterWord)
        }
    }
});

$('#idolModal').on('show.bs.modal', function (event) {
    var memberInfo = MEMBER_INFO[currentIdol]
    memberInfoList = memberInfo.split(',')
    var leaderHeader = ''
    if (memberInfoList[0] == '陳詩雅' || memberInfoList[0] == '劉語晴' || memberInfoList[0] == '劉曉晴')
        leaderHeader = '👑&nbsp;&nbsp;'
    var isShowLive = (memberInfoList[5] != '')? '' : 'tno'
    var isShowLiveFile = (memberInfoList[6] != '')? '' : 'tno'
    var isFormer = (memberInfoList[2] == 'Former')? 'tno' : ''
    var isFormerText = (memberInfoList[2] == 'Former')? '' : 'text-center'
    var content = MEMBER_TEMPLATE.replaceAll('((member_item_unit_class))',getUnitName(memberInfoList[2])).replaceAll('((member_item_unit))',leaderHeader + 'Unit ' + memberInfoList[2]).replaceAll('((member_item_name))',memberInfoList[0]).replaceAll('((member_item_en_name_format))',getFormatEnglishName(memberInfoList[3])).replaceAll('((member_item_nickname))',memberInfoList[1]).replaceAll('((member_item_info_url))',OFFICIAL_MEMBER_URL+memberInfoList[3]).replaceAll('((member_item_ig))',memberInfoList[4]).replaceAll('((member_item_ig_url))',OFFICIAL_IG_URL+memberInfoList[4]).replaceAll('((member_item_live))',memberInfoList[5]).replaceAll('((member_item_live_url))',OFFICIAL_LIVE_URL+memberInfoList[5]).replaceAll('((member_item_live_record_name))',memberInfoList[6]).replaceAll('((member_item_live_record_url))',OFFICIAL_LIVE_FILE_URL+memberInfoList[7]).replaceAll('((member_item_catchphrase))', getCatchphraseHtml(memberInfoList[8])).replaceAll('((member_item_fans_group))',memberInfoList[9]).replaceAll('((member_item_colors))',memberInfoList[10]).replaceAll('((is_show_live))',isShowLive).replaceAll('((is_show_live_file))',isShowLiveFile).replaceAll('((is_former))',isFormer).replaceAll('((is_former_text))',isFormerText)
    var backgroundColor = MEMBER_COLOR[currentIdol]

    $('.modal-header').css('background', backgroundColor)
    $('.modal-body').css('background', backgroundColor)
    $('.modal-footer').css('background', backgroundColor)

    $('#idolModalContent').html(content)
    $('#idolModalButton').text('前往 #' + currentIdol + ' 團體動態')
    $('#idolModalIndividualButton').text('前往 #' + currentIdol + ' 個人動態')
})

$('#filterModal').on('show.bs.modal', function (event) {
    $('.modal-header').css('background', 'white')
    $('.modal-body').css('background', 'white')
    $('.modal-footer').css('background', 'white')
})

$('.m_f').on('click', function(event) {
    onIdol(this.innerHTML)
})

$('.badge.badge-danger.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

$('.badge.badge-primary.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

$('.badge.badge-success.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

$('.badge.badge-warning.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

$('.badge.badge-info.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

$('.badge.badge-dark.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

$('.badge.badge-secondary.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

$('.badge.badge-light.b_f').on('click', function(event) {
    onFilter(this.innerHTML)
})

function onIdol(item) {
    currentIdol = item
    if (item in MEMBER_COLOR)
        $('#idolModal').modal('show')
}

function onFilter(filterWord) {
    if (filterWord == '所有內容')
        filterWord = ''
    $('#filterWord').val(filterWord)
    $('#filterModal').modal('show')
}

function filterTimeline(fromMembers) {
    var filterWord = setTimelineItemVisibility(fromMembers)
    var new_url = 'index.html?q=' + filterWord;
    if (filterWord == '') {
        new_url = 'index.html'
    }
    window.location.href = new_url
}

function filterTimelineIndividual(fromMembers) {
    var filterWord = setTimelineItemVisibility(fromMembers)
    var new_url = 'individual.html?q=' + filterWord;
    if (filterWord == '') {
        new_url = 'individual.html'
    }
    window.location.href = new_url
}

function setTimelineItemVisibility(fromMembers) {
    var filterWord = $('#filterWord').val().toLowerCase()
    if (fromMembers) {
        filterWord = currentIdol
    }
    $('.timeline').children().each(function () {
        if (filterWord != '' && this.innerText.indexOf(filterWord) == -1) {
            this.className = 'tno'
        } else {
            this.className = ''
        }
    });
    $('#liveToast').toast('hide')
    return filterWord
}

function getUnitName(unit) {
    if (unit.indexOf('Daisy') != -1) {
        return 'daisy'
    } else if (unit.indexOf('Bellflower') != -1) {
        return 'bellflower'
    } else if (unit.indexOf('Sakura') != -1) {
        return 'sakura'
    } else {
        return 'former'
    }
}

function getCatchphraseHtml(catchphrase) {
    memberInfoCatchphraseHtml = catchphrase
    callStartIndex = catchphrase.indexOf('{', 0)
    callEndIndex = -1
    while (callStartIndex > -1) {
        callEndIndex = catchphrase.indexOf('}', callStartIndex)
        catchphraseWord = catchphrase.substring(callStartIndex + 1, callEndIndex)
        catchphraseWordHtml = getCatchphraseWordHtml(catchphraseWord).replace('((member_info_catchphrase_word))', removeSpecialWordInCatchphrase(catchphraseWord))
        memberInfoCatchphraseHtml = memberInfoCatchphraseHtml.replace('{' + catchphraseWord + '}', catchphraseWordHtml)
        callStartIndex = catchphrase.indexOf('{', callEndIndex)
    }
    return memberInfoCatchphraseHtml
}

function getCatchphraseWordHtml(catchphraseWord) {
    if (catchphraseWord.indexOf('d') == 0 && catchphraseWord.lastIndexOf('d') == catchphraseWord.length - 1) {
        return MEMBER_CATCHPHRASE[1]
    } else {
        return MEMBER_CATCHPHRASE[0]
    }
}

function removeSpecialWordInCatchphrase(catchphraseWord) {
    if (catchphraseWord.indexOf('d') == 0 && catchphraseWord.lastIndexOf('d') == catchphraseWord.length - 1) {
        catchphraseWord = catchphraseWord.substring(1, catchphraseWord.length - 1)
    }
    return catchphraseWord
}

function getFormatEnglishName(name) {
    var formatName = ''
    var nameParts = name.split('-')
    if (nameParts.length == 3) {
        formatName = nameParts[0][0].toUpperCase() + nameParts[0].slice(1) + ', ' + nameParts[1][0].toUpperCase() + nameParts[1].slice(1) + '-' + nameParts[2][0].toUpperCase() + nameParts[2].slice(1)
    } else if (nameParts.length == 2 && nameParts[0].length <= 4) {
        formatName = nameParts[0][0].toUpperCase() + nameParts[0].slice(1) + ', ' + nameParts[1][0].toUpperCase() + nameParts[1].slice(1)
    } else if (nameParts.length == 2 && nameParts[0].length > 4) {
        formatName = nameParts[0][0].toUpperCase() + nameParts[0].slice(1) + ' ' + nameParts[1][0].toUpperCase() + nameParts[1].slice(1)
    }
    return formatName
}