import { app } from "/scripts/app.js";

app.registerExtension({
    name: "Comfy.Numachang.PromptUtils",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === 'NumachangStringConcatenate') {
            const input_name_prefix = 'text_';
            const ignore_fields = ['delimiter'];

            // ヘルパー：接続元ノードから表示用ラベルを取得する
            function getLabelFromLink(linkId) {
                if (!app.graph || !app.graph.links) return null;
                const link = app.graph.links[linkId];
                if (!link) return null;
                const originNode = app.graph.getNodeById(link.origin_id);
                if (!originNode) return null;

                // 1. ノードのwidgetsを確認して、文字列の値を探す
                if (originNode.widgets) {
                    for (const w of originNode.widgets) {
                        if (typeof w.value === 'string' && w.value.trim().length > 0) {
                            let text = w.value.trim();
                            if (text.length > 40) text = text.substring(0, 40) + "...";
                            return text;
                        }
                    }
                }

                // 2. widgetに文字列がない場合は、タイトルまたはタイプを表示
                return originNode.title || originNode.type;
            }

            // 接続変更時の処理
            const onConnectionsChange = nodeType.prototype.onConnectionsChange;
            nodeType.prototype.onConnectionsChange = function (type, index, connected, link_info) {
                if (onConnectionsChange) {
                    onConnectionsChange.call(this, type, index, connected, link_info);
                }

                // 入力の接続（type:1）の場合
                if (type === 1 && this.inputs[index] && this.inputs[index].name.startsWith(input_name_prefix)) {
                    if (connected && link_info) {
                        const linkId = link_info.id || link_info;
                        // タイミングによってリンク情報がまだ取れない場合があるため、遅延実行
                        setTimeout(() => {
                            const label = getLabelFromLink(linkId);
                            if (label) {
                                this.inputs[index].label = label;
                                this.setDirtyCanvas(true, true);
                            }
                        }, 50);
                    } else {
                        // 切断時はラベルをクリア
                        this.inputs[index].label = null;
                    }
                }

                // スロットの表示/非表示を更新
                setTimeout(() => {
                    this.updateInputVisibility();
                }, 100);
            };

            // ノード作成/設定時の初期化処理
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                if (onNodeCreated) onNodeCreated.call(this);
                // 内部状態のバックアップ
                setTimeout(() => {
                    if (!this._all_widgets && this.widgets) {
                        this._all_widgets = [...this.widgets];
                    }
                    this.updateInputVisibility();
                }, 100);
            };

            const onConfigure = nodeType.prototype.onConfigure;
            nodeType.prototype.onConfigure = function (o) {
                if (onConfigure) onConfigure.call(this, o);
                setTimeout(() => {
                    if (!this._all_widgets && this.widgets) {
                        this._all_widgets = [...this.widgets];
                    }
                    this.updateInputVisibility();
                }, 100);
            };

            // 入力スロットとウィジェットの表示管理
            nodeType.prototype.updateInputVisibility = function () {
                if (!this.inputs) return;

                let max_used = -1;

                // 1. 入力スロットの状態を確認
                for (let i = 0; i < this.inputs.length; i++) {
                    const input = this.inputs[i];
                    if (input.name.startsWith(input_name_prefix)) {
                        const idx = parseInt(input.name.split('_')[1]);
                        if (input.link !== undefined && input.link !== null) {
                            if (idx > max_used) max_used = idx;
                            // ラベルの再更新（ロード時用）
                            const label = getLabelFromLink(input.link);
                            if (label) input.label = label;
                        } else {
                            input.label = null;
                        }
                    }
                }

                // 2. ウィジェットの値を確認（直接入力がある場合）
                const widgets_list = this._all_widgets || this.widgets;
                if (widgets_list) {
                    for (const w of widgets_list) {
                        if (w.name && w.name.startsWith(input_name_prefix) && w.value && w.value.toString().trim() !== "") {
                            const idx = parseInt(w.name.split('_')[1]);
                            if (idx > max_used) max_used = idx;
                        }
                    }
                }

                // 3. 表示すべき範囲を計算（最後に入力されたスロット + 1）
                const target_count = Math.min(max_used + 1, 50);

                // 4. ウィジェット（テキストボックス）のフィルタリング
                if (widgets_list) {
                    const visible_widgets = [];
                    for (const w of widgets_list) {
                        if (w.name && w.name.startsWith(input_name_prefix)) {
                            const idx = parseInt(w.name.split('_')[1]) - 1; // 0-base
                            if (idx <= target_count) {
                                visible_widgets.push(w);
                            }
                        } else {
                            // delimiterなどの共通ウィジェットは常に表示
                            visible_widgets.push(w);
                        }
                    }
                    if (this.widgets && visible_widgets.length !== this.widgets.length) {
                        this.widgets = visible_widgets;
                        this.setSize(this.computeSize());
                    }
                }

                this.setDirtyCanvas(true, true);
            };
        }
    }
});
