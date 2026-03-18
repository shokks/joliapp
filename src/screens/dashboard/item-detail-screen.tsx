import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppIcon } from "@/src/components/ui/app-icon";
import { Screen } from "@/src/components/ui/screen";
import { SectionLabel } from "@/src/components/ui/section-label";
import { useAppContext } from "@/src/lib/state/app-context";
import { usePalette } from "@/src/lib/theme/theme-context";

function formatDetailDate(date: string | null, locale: "en-US" | "de-DE", noDateLabel: string) {
  if (!date) {
    return noDateLabel;
  }

  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function ItemDetailScreen() {
  const router = useRouter();
  const palette = usePalette();
  const { getDashboardItemById, markDashboardItemDone, snoozeDashboardItem, updateDashboardItemDueDate, locale, translation } = useAppContext();
  const params = useLocalSearchParams<{ itemId?: string }>();
  const [expandedAction, setExpandedAction] = useState<"snooze" | "due-date" | null>(null);
  const selectedItem = getDashboardItemById(params.itemId ?? "") ?? getDashboardItemById("action-permission-slip");

  if (!selectedItem) {
    return null;
  }

  const highlightedMessageParts = selectedItem.messageBody.split(selectedItem.evidenceSnippet);
  const hasInlineMatch = highlightedMessageParts.length > 1;
  const detailLabel = selectedItem.source.split(" · ")[0] ?? selectedItem.source;
  const titleParts = selectedItem.title.split(" — ");
  const title = titleParts[0] ?? selectedItem.title;
  const subtitle = titleParts.slice(1).join(" — ");
  const isActionItem = selectedItem.type === "action";
  const sourceDate = selectedItem.source.split(" · ").slice(1).join(" · ");
  const detailDateLabel = isActionItem ? translation.itemDetail.dueDate : translation.itemDetail.eventDate;
  const detailDateValue = formatDetailDate(
    selectedItem.date,
    locale === "de" ? "de-DE" : "en-US",
    translation.itemDetail.noDate,
  );

  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <AppIcon name="chevron-left" size={18} color={palette.muted} />
      </Pressable>

      <View style={styles.headerBlock}>
        <Text style={[styles.headerMeta, { color: palette.muted }]}>{detailLabel}</Text>
        <Text style={[styles.headerTitle, { color: palette.foreground }]}>{title}</Text>
        {subtitle ? <Text style={[styles.headerSubtitle, { color: palette.accent }]}>{subtitle}</Text> : null}

        <View style={[styles.dateBlock, { borderTopColor: palette.border }]}> 
          <View style={styles.dateRow}>
            <View style={styles.dateContent}>
              <Text style={[styles.dateLabel, { color: palette.muted }]}>{detailDateLabel}</Text>
              <Text style={[styles.dateValue, { color: palette.foreground }]}>{detailDateValue}</Text>
            </View>

            {isActionItem ? (
              <Pressable
                style={styles.dateEditButton}
                onPress={() => setExpandedAction((current) => (current === "due-date" ? null : "due-date"))}
              >
                <AppIcon name="edit-2" size={14} color={palette.muted} />
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>

      {isActionItem && expandedAction === "due-date" ? (
        <View style={styles.inlineChooser}>
          <Text style={[styles.chooserLabel, { color: palette.muted }]}>{translation.itemDetail.changeDueDate}</Text>
          <View style={styles.choiceRow}>
            <Pressable
              style={styles.choiceChip}
              onPress={() => {
                updateDashboardItemDueDate(selectedItem.id, "tomorrow");
                setExpandedAction(null);
              }}
            >
              <Text style={[styles.choiceChipText, { color: palette.foreground }]}>{translation.itemDetail.tomorrow}</Text>
            </Pressable>
            <Pressable
              style={styles.choiceChip}
              onPress={() => {
                updateDashboardItemDueDate(selectedItem.id, "in_3_days");
                setExpandedAction(null);
              }}
            >
              <Text style={[styles.choiceChipText, { color: palette.foreground }]}>{translation.itemDetail.in3Days}</Text>
            </Pressable>
            <Pressable
              style={styles.choiceChip}
              onPress={() => {
                updateDashboardItemDueDate(selectedItem.id, "next_week");
                setExpandedAction(null);
              }}
            >
              <Text style={[styles.choiceChipText, { color: palette.foreground }]}>{translation.itemDetail.nextWeek}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <View style={[styles.evidenceBlock, { borderTopColor: palette.border }]}> 
        <SectionLabel>{translation.itemDetail.originalMessage}</SectionLabel>
        <Text style={[styles.messageBody, { color: palette.foreground }]}> 
          {hasInlineMatch ? (
            <>
              {highlightedMessageParts[0]}
              <Text style={[styles.highlight, { color: palette.foreground }]}>{selectedItem.evidenceSnippet}</Text>
              {highlightedMessageParts.slice(1).join(selectedItem.evidenceSnippet)}
            </>
          ) : (
            <>
              {selectedItem.messageBody}
              <Text style={[styles.highlight, { color: palette.foreground }]}> {selectedItem.evidenceSnippet}</Text>
            </>
          )}
        </Text>
        <Text style={[styles.messageMeta, { color: palette.muted }]}>{sourceDate ? `${sourceDate} ${translation.itemDetail.viaKlapp}` : translation.itemDetail.viaKlapp}</Text>
      </View>

      {isActionItem ? (
        <View style={[styles.sectionSep, { borderTopColor: palette.border }]}> 
          <SectionLabel>{translation.itemDetail.actions}</SectionLabel>
          <View style={styles.actions}>
            <Pressable
              onPress={() => {
                markDashboardItemDone(selectedItem.id);
                router.back();
              }}
            >
              <Text style={[styles.actionDone, { color: palette.accent }]}>{translation.itemDetail.markDone}</Text>
            </Pressable>
            <Text style={[styles.actionSep, { color: palette.muted }]}>·</Text>
            <Pressable onPress={() => setExpandedAction((current) => (current === "snooze" ? null : "snooze"))}>
              <Text style={[styles.actionSnooze, { color: palette.muted }]}>{translation.itemDetail.snooze}</Text>
            </Pressable>
          </View>

          {expandedAction === "snooze" ? (
            <View style={styles.presetsRow}>
              <Pressable
                onPress={() => {
                  snoozeDashboardItem(selectedItem.id, "1d");
                  setExpandedAction(null);
                }}
              >
                <Text style={[styles.presetAction, { color: palette.muted }]}>{translation.itemDetail.snooze1Day}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  snoozeDashboardItem(selectedItem.id, "3d");
                  setExpandedAction(null);
                }}
              >
                <Text style={[styles.presetAction, { color: palette.muted }]}>{translation.itemDetail.snooze3Days}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  snoozeDashboardItem(selectedItem.id, "1w");
                  setExpandedAction(null);
                }}
              >
                <Text style={[styles.presetAction, { color: palette.muted }]}>{translation.itemDetail.snooze1Week}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    paddingVertical: 4,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  sectionSep: {
    borderTopWidth: 1,
    paddingTop: 18,
    gap: 14,
  },
  headerBlock: {
    gap: 10,
    paddingTop: 6,
    paddingBottom: 4,
  },
  headerMeta: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 33,
    lineHeight: 37,
    fontWeight: "700",
    letterSpacing: -1.2,
  },
  headerSubtitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "500",
    letterSpacing: -0.3,
  },
  dateBlock: {
    paddingTop: 16,
    gap: 10,
    borderTopWidth: 1,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  dateContent: {
    flex: 1,
    gap: 4,
  },
  dateEditButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  inlineChooser: {
    gap: 10,
    marginTop: -2,
    marginBottom: 6,
  },
  chooserLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  choiceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  choiceChip: {
    paddingBottom: 2,
  },
  choiceChipText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
  },
  dateLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  dateValue: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  evidenceBlock: {
    borderTopWidth: 1,
    paddingTop: 18,
    gap: 14,
    marginTop: 6,
  },
  messageBody: {
    fontSize: 15,
    lineHeight: 25,
    opacity: 0.86,
  },
  highlight: {
    fontWeight: "600",
    opacity: 1,
    textDecorationLine: "underline",
  },
  messageMeta: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.58,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
  },
  presetsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  actionDone: {
    fontSize: 13,
    fontWeight: "600",
  },
  actionSep: {
    fontSize: 13,
    opacity: 0.4,
  },
  actionSnooze: {
    fontSize: 13,
  },
  presetAction: {
    fontSize: 13,
    lineHeight: 18,
  },
});
