document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('saveButton');
    var accelLinkInput = document.getElementById('accelLinkInput');

    saveButton.addEventListener('click', function() {
        var accelLink = accelLinkInput.value;
        chrome.storage.sync.set({ 'accelLink': accelLink }, function() {
            if (chrome.runtime.lastError) {
                console.error('保存加速链接失败：', chrome.runtime.lastError.message);
                alert('保存失败，请稍后重试。');
            } else {
                console.log('加速链接保存成功：', accelLink);
                alert('加速链接保存成功！');
            }
        });
    });
});