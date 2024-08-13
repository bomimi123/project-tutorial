package com.example;

import java.util.List;
import javax.swing.table.AbstractTableModel;
import java.text.SimpleDateFormat;

public class MatchTableModel extends AbstractTableModel {
    private final List<Match> matches;
    private final String[] columnNames = {"Match ID", "Player 1 ID", "Player 2 ID", "Start Time", "End Time", "Winner ID"};
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public MatchTableModel(List<Match> matches) {
        this.matches = matches;
    }

    @Override
    public int getRowCount() {
        return matches.size();
    }

    @Override
    public int getColumnCount() {
        return columnNames.length;
    }

    @Override
    public Object getValueAt(int rowIndex, int columnIndex) {
        if (rowIndex < 0 || rowIndex >= matches.size()) {
            return null;
        }
        Match match = matches.get(rowIndex);
        switch (columnIndex) {
            case 0:
                return match.getMatchId();
            case 1:
                return match.getPlayer1Id();
            case 2:
                return match.getPlayer2Id();
            case 3:
                return dateFormat.format(match.getStartTime());
            case 4:
                return dateFormat.format(match.getEndTime());
            case 5:
                return match.getWinnerId();
            default:
                return null;
        }
    }

    @Override
    public String getColumnName(int column) {
        if (column < 0 || column >= columnNames.length) {
            return null;
        }
        return columnNames[column];
    }

    public void setMatches(List<Match> matches) {
        this.matches.clear();
        this.matches.addAll(matches);
        fireTableDataChanged();
    }
}
