chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "accelerateDownload",
        title: "快下",
        contexts: ["link"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId === "accelerateDownload") {
        chrome.storage.sync.get('accelLink', function(result) {
            if (chrome.runtime.lastError) {
                console.error('获取加速链接失败：', chrome.runtime.lastError.message);
                alert('获取加速链接失败，请确保已保存加速链接。');
                return;
            }
            const accelerateLink = result.accelLink;
            if (!accelerateLink) {
                console.error('未设置加速链接。');
                alert('未设置加速链接，请在插件弹出窗口中设置。');
                return;
            }
            // 直接使用字符串拼接
            const newUrl = accelerateLink + info.linkUrl;
            try {
                chrome.tabs.create({ url: newUrl }, function(tab) {
                    console.log('通过加速链接打开新标签页：', newUrl);
                });
            } catch (e) {
                console.error('创建新标签页失败：', e);
                alert('创建新标签页失败，请稍后重试。');
            }
        });
    }
});