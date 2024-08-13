package com.example;

import java.awt.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.swing.*;

public class GUI {
    private JFrame frame;
    private JTable table;
    private JButton btnSortByWinRate;
    private JButton btnLoadRandomUser;
    private JButton btnAddNewUser;
    private UserManager userManager;

    public GUI() {
        frame = new JFrame("Match Statistics");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(800, 600);
        frame.setLayout(new BorderLayout());

        table = new JTable();
        JScrollPane scrollPane = new JScrollPane(table);
        frame.add(scrollPane, BorderLayout.CENTER);

        JPanel panel = new JPanel(new FlowLayout());
        btnSortByWinRate = new JButton("Sort by Win Rate");
        btnSortByWinRate.addActionListener(e -> loadSortedMatches());
        panel.add(btnSortByWinRate);

        btnLoadRandomUser = new JButton("Load Random User");
        btnLoadRandomUser.addActionListener(e -> loadRandomUser());
        panel.add(btnLoadRandomUser);

        btnAddNewUser = new JButton("Add New User");
        btnAddNewUser.addActionListener(e -> addNewUser());
        panel.add(btnAddNewUser);

        frame.add(panel, BorderLayout.SOUTH);

        userManager = new UserManager();

        loadMatches();
        frame.setVisible(true);
    }


    // Load Matches
    private void loadMatches() {
        String query = "SELECT * FROM matches";  
        try (Connection conn = Db.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            List<Match> matches = new ArrayList<>();
            while (rs.next()) {
                matches.add(new Match(
                    rs.getInt("match_id"),
                    rs.getInt("player1_id"),
                    rs.getInt("player2_id"),
                    rs.getTimestamp("start_time"),
                    rs.getTimestamp("end_time"),
                    rs.getInt("winner_id")
                ));
            }

            MatchTableModel model = new MatchTableModel(matches);
            table.setModel(model);
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Error loading matches: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    // Load Random User
    private void loadRandomUser() {
        String query = "SELECT user_id, username, email FROM users ORDER BY RAND() LIMIT 1";
        try (Connection conn = Db.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            if (rs.next()) {
                int userId = rs.getInt("user_id");
                String username = rs.getString("username");
                String email = rs.getString("email");

                // Tạo dữ liệu cho JTable
                String[] columnNames = {"User ID", "UserName", "Email"};
                Object[][] data = {
                    {userId, username, email}
                };

                // Tạo JTable với dữ liệu
                JTable userTable = new JTable(data, columnNames);
                JScrollPane scrollPane = new JScrollPane(userTable);

                // Tạo JDialog để hiển thị JTable
                JDialog dialog = new JDialog(frame, "Random User", true);
                dialog.setSize(400, 200);
                dialog.setLayout(new BorderLayout());
                dialog.add(scrollPane, BorderLayout.CENTER);

                // Hiển thị JDialog
                dialog.setLocationRelativeTo(frame);
                dialog.setVisible(true);
            } else {
                JOptionPane.showMessageDialog(frame, "No User Found", "Information", JOptionPane.INFORMATION_MESSAGE);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Error loading random user: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void loadSortedMatches() {
        String query = "SELECT u.user_id, u.username, " +
                       "(SELECT COUNT(*) FROM matches m WHERE m.winner_id = u.user_id) AS wins, " +
                       "(SELECT COUNT(*) FROM matches m WHERE m.player1_id = u.user_id OR m.player2_id = u.user_id) AS total " +
                       "FROM users u";
    
        try (Connection conn = Db.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
    
            Map<Integer, Double> winRates = new HashMap<>();
            while (rs.next()) {
                int userId = rs.getInt("user_id");
                int wins = rs.getInt("wins");
                int total = rs.getInt("total");
                double winRate = total == 0 ? 0 : (double) wins / total;
                winRates.put(userId, winRate);
            }
    
            List<Match> matches = new ArrayList<>();
            String matchQuery = "SELECT * FROM matches";
            try (Statement matchStmt = conn.createStatement();
                 ResultSet matchRs = matchStmt.executeQuery(matchQuery)) {
    
                while (matchRs.next()) {
                    matches.add(new Match(
                        matchRs.getInt("match_id"),
                        matchRs.getInt("player1_id"),
                        matchRs.getInt("player2_id"),
                        matchRs.getTimestamp("start_time"),
                        matchRs.getTimestamp("end_time"),
                        matchRs.getInt("winner_id")
                    ));
                }
            }
    
            matches.sort((m1, m2) -> {
                double winRate1 = winRates.getOrDefault(m1.getWinnerId(), 0.0);
                double winRate2 = winRates.getOrDefault(m2.getWinnerId(), 0.0);
                return Double.compare(winRate2, winRate1);
            });
    
            MatchTableModel model = new MatchTableModel(matches);
            table.setModel(model);
    
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Error sorting matches: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void addNewUser() {
        JTextField usernameField = new JTextField(20);
        JTextField emailField = new JTextField(20);
        JPasswordField passwordField = new JPasswordField(20);
    
        JPanel panel = new JPanel(new GridLayout(0, 1));
        panel.add(new JLabel("User Name:"));
        panel.add(usernameField);
        panel.add(new JLabel("Email:"));
        panel.add(emailField);
        panel.add(new JLabel("Password:"));
        panel.add(passwordField);
    
        int result = JOptionPane.showConfirmDialog(frame, panel, "Add New User", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
    
        if (result == JOptionPane.OK_OPTION) {
            String username = usernameField.getText().trim();
            String email = emailField.getText().trim();
            String password = new String(passwordField.getPassword()).trim();
    
            if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
                JOptionPane.showMessageDialog(frame, "All fields must be filled out.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }
    
            try {
                userManager.addUser(username, email, password);
                loadMatches();
            } catch (Exception e) {
                e.printStackTrace();
                JOptionPane.showMessageDialog(frame, "Error adding new user: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(GUI::new);
    }
}
